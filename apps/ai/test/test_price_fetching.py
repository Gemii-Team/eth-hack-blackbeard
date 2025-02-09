import requests

def get_crypto_price(symbol: str):
    url = f"https://api.binance.com/api/v3/ticker/price?symbol={symbol.upper()}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return data["price"]
    else:
        return f"Error: {response.status_code}"