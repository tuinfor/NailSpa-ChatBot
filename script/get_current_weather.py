from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
from socket import error as SocketError
from urllib.request import urlopen

import errno
import urllib3
import sys
import os
import time
import datetime

def main():
    window_size = "1200,800"
    timeout = 20

    chrome_options = Options()
    chrome_options.binary_location = os.environ.get('GOOGLE_CHROME_SHIM', None)
    chrome_options.add_argument("--window-size=%s" % window_size)
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("no-sandbox")

    # Need to debug this
    try:
        response = urllib3
    except SocketError as e:
        if e.errno != errno.ECONNRESET:
            raise print('test')

    browser = webdriver.Chrome(chrome_options=chrome_options)
    browser.get("https://www.google.com/search?rlz=1C5CHFA_enUS760US760&ei=U5jyWvaKOoX3zgLGw6boAQ&q=fayetteville+ga+weather&oq=fayet+Ga+weather&gs_l=psy-ab.1.0.0i7i30k1j0i13k1j0i7i30k1l8.73.1042.0.2482.5.4.0.0.0.0.464.1340.0j1j0j2j1.4.0....0...1.1.64.psy-ab..3.2.820....0.Lvo8lHlOVJM")

    browser.implicitly_wait(2)
    html = browser.page_source
    newSoup = BeautifulSoup(html, "html.parser")

    status = newSoup.find('div', {'class' : 'vk_c card-section'}).find('div', {'id' : 'wob_dcp'}).find('span', {'class' : 'vk_gy vk_sh'}).text
    degree = newSoup.find('div', {'class' : 'vk_c card-section'}).find('div', {'class' : 'vk_bk sol-tmp'}).find('span', {'class': 'wob_t'}).text
    precipitation = newSoup.find('div', {'class' : 'vk_c card-section'}).find('div', {'class' : 'vk_gy vk_sh wob-dtl'}).findAll('div')[0].find('span', {'id' : 'wob_pp'}).text
    humidity = newSoup.find('div', {'class' : 'vk_c card-section'}).find('div', {'class' : 'vk_gy vk_sh wob-dtl'}).findAll('div')[1].find('span', {'id' : 'wob_hm'}).text
    wind = newSoup.find('div', {'class' : 'vk_c card-section'}).find('div', {'class' : 'vk_gy vk_sh wob-dtl'}).findAll('div')[2].find('span').findAll('span')[0].text

    currentDT = datetime.datetime.now()
    hour = currentDT.strftime("%I:%M %p")[:2]
    minutes = currentDT.strftime("%I:%M %p")[3:5]
    amPm = currentDT.strftime("%I:%M %p")[6::]

    if (int(hour[:1]) == 0):
        hours = int(hour[1:])
    else:
        hours = int(hour)

    print("Condition: " + status)
    print("Current Degree: " + degree)
    print("Precipitation: " + precipitation)
    print("Humidity: " + humidity)
    print("Wind: " + wind)

    # Check the current condition weather
    if (int(degree) >= 60):
        if (amPm == 'AM'):
            if (hours >= 6 and hours <= 11):
                print("The weather is really nice today! Let come to our salon and relax.")
            else:
                print("The weather is really nice today! But we already closed, let come tomorrow.")
        elif (amPm == 'PM'):
            if (hours == 12 or hours <=7):
                print("The weather is really nice today! Let come to our salon and relax.")
            else:
                print("The weather is really nice today! But we already closed, let come tomorrow.")
    elif (int(degree) < 60 and int(degree) > 48):
        print("The weather is cold today!")
    else:
        print("The weather is really cold today! You should prepare well.")

    # Check if the weather about to rain or raining
    if (status == 'Thunderstorm' or status == 'Raining' or status == 'Showers' or status == 'Rain'):
        print("By the way, YOU SHOULD BRING YOUR UMBRELLA")

    browser.quit()
    sys.exit(0)

if __name__ == '__main__':
    main()
