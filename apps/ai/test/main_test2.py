from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv
import os
from src.price_fetching import get_crypto_price  # ฟังก์ชันดึงราคาคริปโต

# โหลดค่า API Key
load_dotenv()

# ตั้งค่า FastAPI
app = FastAPI()

# โหลด LLM (OpenAI)
llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))

# ฟังก์ชันดึงราคาคริปโตแบบอัปเดตล่าสุด
def get_prices():
    return {
        "BTCUSDT": get_crypto_price("BTCUSDT"),
        "ETHUSDT": get_crypto_price("ETHUSDT")
    }

# ฟังก์ชันแก้ไข state
def modify_state(state):
    prices = get_prices()
    return (
        f"You are a crypto advisor. Give strategic advice based on current trends.\n"
        f"- BTC Price: {prices['BTCUSDT']}\n"
        f"- ETH Price: {prices['ETHUSDT']}"
    )

# สร้าง Agent 
agent_executor = create_react_agent(
    llm,
    tools=[],  # สามารถเพิ่ม Tool เช่นข่าวสาร หรือ Indicator ได้
    checkpointer=None,
    state_modifier=modify_state,
)

# สร้าง Pydantic Model สำหรับรับ Request
class ChatRequest(BaseModel):
    message: str
    session_id: str  # ใช้สำหรับระบุ session ของผู้ใช้

# API Endpoint สำหรับรับข้อความและส่งให้ LangChain ประมวลผล
@app.post("/chat")
async def chat_crypto_advisor(request: ChatRequest):
    try:
        response = agent_executor.invoke(
            {
                "messages": [HumanMessage(content=request.message)],
                "thread_id": request.session_id
            }
        )

        if "messages" in response and len(response["messages"]) > 0:
            return {"advisor_response": response["messages"][-1].content}
        else:
            return {"advisor_response": "Sorry, I couldn't generate a response."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

