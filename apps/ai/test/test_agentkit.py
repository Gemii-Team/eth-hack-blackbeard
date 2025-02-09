from langchain_openai import ChatOpenAI
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

from langchain_core.tools import StructuredTool

from dotenv import load_dotenv
import os

from test_news_search import search_google_news

# Load API Keys from .env
load_dotenv()

# Initialize the LLM
llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))

# Initialize CDP AgentKit wrapper
cdp = CdpAgentkitWrapper()

# Create toolkit from wrapper
cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)

# Get all available tools
tools = cdp_toolkit.get_tools()

# Structured Tool
crypto_news_tool = StructuredTool.from_function(
    search_google_news,
    name="search_google_news",
    description="Get the latest crypto news, such as: BTC"
)

# เพิ่มเข้าไปใน tools ที่ agent ใช้งานได้
tools.append(crypto_news_tool)

# Create an agent using available tools
agent_executor = create_react_agent(llm, tools)

def process_user_input(user_input):
    """ Function to process user input and interact with CDP agent """
    messages = [HumanMessage(content=user_input)]
    
    # Execute the agent with the user input
    events = agent_executor.stream({"messages": messages}, stream_mode="values")

    # Print responses
    for event in events:
        print(event["messages"][-1].content)

# Example usage
while True:
    user_input = input("You: ")  # Get input from the user
    if user_input.lower() in ["exit", "quit"]:  # Exit condition
        break
    process_user_input(user_input)  # Process user request
