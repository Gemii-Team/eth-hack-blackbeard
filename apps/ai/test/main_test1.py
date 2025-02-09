from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv
import os
from src.price_fetching import get_crypto_price  # ฟังก์ชันดึงราคาคริปโต

# โหลดค่าจาก .env
load_dotenv()
llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))

# ใช้ Memory Saver จำพอร์ตของ User
memory = MemorySaver()

# ดึงราคาล่าสุดของ BTC หรือ ETH
btc_price = get_crypto_price("BTCUSDT")
eth_price = get_crypto_price("ETHUSDT")

# ฟังก์ชัน state_modifier สำหรับ AI
def modify_state(state):
    return f"You are a crypto advisor. Give strategic advice based on current trends.\n- BTC Price: {btc_price}\n- ETH Price: {eth_price}"

# ใช้ ReAct Agent เพื่อให้ AI วิเคราะห์ก่อนให้คำตอบ
agent_executor = create_react_agent(
    llm,
    tools=[],  # ถ้ามี Tools เช่นข่าวสารหรือ indicator ให้ใส่ที่นี่
    checkpointer=None,
    state_modifier=modify_state,  # ใช้ฟังก์ชันแทน string
)

# ฟังก์ชันรับ input จาก user
def chat_crypto_advisor():
    print("🔹 Crypto Advisor Chatbot (พิมพ์ 'exit' เพื่อออก)")
    while True:
        user_input = input("\nUser: ")
        if user_input.lower() == "exit":
            break

        response = agent_executor.invoke(
            {"messages": [HumanMessage(content=user_input)], "thread_id": "user_session"}
        )

        if "messages" in response and len(response["messages"]) > 0:
            print("\nAdvisor:", response["messages"][-1].content)  # แสดงข้อความสุดท้ายจาก AI
        else:
            print("\nAdvisor: Sorry, I couldn't generate a response.")

chat_crypto_advisor()
