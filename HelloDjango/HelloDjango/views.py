from django.http import HttpResponse
from django.shortcuts import render
import urllib
import json
import math
from urllib import request
import os
import random

def homepage(request):
    url = "https://services.swpc.noaa.gov/json/ovation_aurora_latest.json"
    logo = urllib.request.urlopen(url).read()
    hemip = "https://services.swpc.noaa.gov/text/aurora-nowcast-hemi-power.txt"
    hemip_temp = urllib.request.urlopen(hemip).read()
    url1 = "https://services.swpc.noaa.gov/products/solar-wind/mag-6-hour.json"
    logg_ = urllib.request.urlopen(url1).read()
    url2 = "https://services.swpc.noaa.gov/products/solar-wind/plasma-6-hour.json"
    logo__ = urllib.request.urlopen(url2).read()
    f = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/aurora.txt", "wb")
    f.write(logo)
    f.close()
    hemip_txt = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/hemipower.txt", "wb")
    hemip_txt.write(hemip_temp)
    hemip_txt.close()
    mag = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/mag.txt", "wb")
    mag.write(logg_)
    mag.close()
    plas = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/plas.txt", "wb")
    plas.write(logo__)
    plas.close()

    fff = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/aurora.txt", "r")
    ff = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/aurora_ext.csv", "w")
    ff.write("category,latitude,longitude" + '\n')

    for line in fff:
        _aurora = json.loads(line)
        coordinates = _aurora['coordinates']
        for line in coordinates:
            if (line[2] < 3):
                continue
            if (math.fabs(line[1]) < 50 ):
                continue
            ff.write(str(line[2]) + ',' + str(line[1]) + ',' + str(line[0] + 180) + '\n')
    fff.close()
    ff.close()

    hemip_wk = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/hemipower.txt", "r")
    hemip_ext = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/hemipower_ext.csv", "w")
    hemip_ext.write("time,NorthHPI,SouthHPI" + '\n')

    minutehp = 0
    norc = 0
    souc = 0
    for linehp in hemip_wk:
        linehp.strip()
        if '#' in linehp:
            continue
        slinehp=linehp.split()
        hemip_ext.write(str(slinehp[1]) + ',' + str(slinehp[2]) + ',' + str(slinehp[3]) + '\n')
        norc = slinehp[2]
        souc = slinehp[3]
        minutehp+=1
    hemip_wk.close()
    hemip_ext.close()

    magx = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/mag.txt", "r")
    mag_ = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/mag_ext.json", "w")
    mag_gr = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/graph_mag.csv", "w")
    mag_gr.write("time,bx,by,bz" + '\n')

    for line in magx:
        _mag = json.loads(line)
        _len = len(_mag)-1
        for line in _mag:
            if (line[0] == 'time_tag'): continue
            if(line[0] and line[1] and line[2] and line[3]):
                mag_gr.write(line[0] + ',' + line[1] + ',' + line[2] + ',' + line[3] + '\n')
        mag_.write('[{"time_tag":"' + str(_mag[_len][0]) + '","bx_gsm":"' + str(_mag[_len][1]) + '","by_gsm":"' + str(_mag[_len][2]) + '","bz_gsm":"' + str(_mag[_len][3]) + '","lon_gsm":"' + str(_mag[_len][4]) + '","lat_gsm":"' + str(_mag[_len][5]) + '","bt":"'+ str(_mag[_len][6]) + '"}]')
    magx.close()
    mag_.close()
    mag_gr.close()

    plass = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/plas.txt", "r")
    plas_ = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/plas_ext.json", "w")
    plas__ = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/graph_plas.csv", "w")
    plas__.write("time,density,speed,temperature" + '\n')
    
    for lane in plass:
        _aurora = json.loads(lane)
        coordinates = _aurora
        if(coordinates):
            plas_.write('[{"density":"' + str(coordinates[len(coordinates)-1][1]) + '","speed":"' + str(coordinates[len(coordinates)-1][2]) + '","temperature":"' + str(coordinates[len(coordinates)-1][3]) + '","northpi":"' + str(norc) + '","southpi":"'+ str(souc) + '"}]')
        for k in range(1,len(coordinates)):
            if((coordinates[k][0]) and (coordinates[k][1]) and  (coordinates[k][2])):
                plas__.write(str(coordinates[k][0]) + ',' + str(coordinates[k][1]) + ',' + str(coordinates[k][2]) +','+ '0'  + '\n')
                
    plass.close()
    plas_.close()
    plas__.close()
    return render(request,'night,south.html')

def north(request):
    url = "https://services.swpc.noaa.gov/json/ovation_aurora_latest.json"
    logo = urllib.request.urlopen(url).read()
    f = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/aurora.txt", "wb")
    f.write(logo)
    f.close()
    fff = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/aurora.txt", "r")
    ff = open("/home/g/gimslaw8/aurora-forecast.ru/public_html/aurora_ext1.csv", "w")
    ff.write("Category,Longitude,Latitude" + '\n')
    for line in fff:
        _aurora = json.loads(line)
        coordinates = _aurora['coordinates']
        for line in coordinates:
            m = random.uniform(0, 0.25)
            i = 0
            if (line[2] == 0 or line[2] < 5):
                continue
            if (math.fabs(line[1]) < 50 ):
                continue
            if ((line[1]) >= 0):
                continue
            while (i< line[2]):
                ff.write(str(line[2]) + ',' + (str(line[0] - 180 + m)) + ',' + str(line[1]) + '\n')
                i = i + 1
    fff.close()
    ff.close()
    return render(request,'heatmap.html')
