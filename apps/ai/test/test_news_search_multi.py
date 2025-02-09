from googlesearch import search

def search_google_news(coin_symbols: str, num_results: int = 5, region: str = "us"):
    """
    ดึงข่าวสารล่าสุดของเหรียญคริปโตที่ต้องการจาก Google News
    สามารถค้นหาได้หลายเหรียญ โดยให้แยกด้วยเครื่องหมาย ","
    """
    coin_list = [coin.strip().upper() for coin in coin_symbols.split(",")]
    news_results = {}

    for coin in coin_list:
        query = f"{coin} crypto news"
        results = search(query, advanced=True, region=region)

        news_list = []
        for i, result in enumerate(results):
            if i >= num_results:
                break
            news_list.append(f"- {result.title} ({result.url})")

        news_results[coin] = news_list

    return "\n\n".join(
        [f"🔹 ข่าวล่าสุดเกี่ยวกับ {coin}:\n" + "\n".join(news_results[coin]) for coin in news_results]
    ) if news_results else "❌ ไม่พบข่าวที่เกี่ยวข้อง"
