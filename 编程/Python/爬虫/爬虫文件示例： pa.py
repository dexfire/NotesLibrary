#!/usr/bin/python
import os,sys,getopt
import requests
import urllib
from bs4 import BeautifulSoup

def download(url,path,minimal_size):
    res = requests.get(url)
    # print res

    soup = BeautifulSoup(res.text,'html.parser')
    # print(soup.select('a'))

    for a in soup.select('a'):
        aa = str(a)
        st = aa.find('http')
        ed = aa.find('"',st)
        url = aa[st:ed]
        if len(url)>30:
            pathx = '%s\%s' % (path,url[url.rfind('/',st,ed)+1:ed])
            print 'downloading %s' % url
            try:
                ress = requests.get(url)
                jpg = open(pathx,"wb")
                jpg.write(ress.content)
            except IOError:
                print 'write error to %s' % pathx
                print 
            except Exception:
                print 'download error'
                print

def usage():
    print '--------------------------------------------------------------------'
    print 
    print '   python %s <imas.gamedbs.jp address> <save dir> [<minimal expected images size in KB>]'
    print
    print '  Notice:'
    print '\t create the folder at first!!!'
    print
    print '  Examples:'
    print '\t python %s http://imas.gamedbs.jp/cgss/bg %s' % (sys.argv[0],r'.\bg')
    print '\t   => download images from http://imas.gamedbs.jp/cgss/bg to %s' % r'.\bg'
    print    
    print '\t python %s http://imas.gamedbs.jp/cgss/bg %s 100' % (sys.argv[0],r'.\bg')
    print '\t   => download images from http://imas.gamedbs.jp/cgss/bg to %s' % r'.\bg'
    print '\t      and also block the images whose size is less than 100kb'
    print
    print '--------------------------------------------------------------------'


def main():
    if len(sys.argv)<3:
        usage()
    else if len(sys.argv)==3:
        download(sys.argv[1],sys.argv[2],0)
    else if len(sys.argv)==4:
        download(sys.argv[1],sys.argv[2],sys.argv[3])

if __name__ == "__main__":
    main()
