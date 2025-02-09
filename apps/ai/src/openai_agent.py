from langchain_openai import ChatOpenAI
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import StructuredTool
import os
from dotenv import load_dotenv
from src.news_search import search_google_news

load_dotenv()

openai_llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))

cdp = CdpAgentkitWrapper()
cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)

tools = cdp_toolkit.get_tools()

crypto_news_tool = StructuredTool.from_function(
    search_google_news,
    name="search_google_news",
    description="Get the latest crypto news, such as BTC"
)
tools.append(crypto_news_tool)

openai_agent = create_react_agent(openai_llm, tools)
