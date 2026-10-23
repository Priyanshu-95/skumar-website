import urllib.request
import re
import glob

files = glob.glob('src/**/*.ts*', recursive=True)

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    urls = re.findall(r'https://images\.unsplash\.com/photo-[^\s\'\"]+', content)
    for u in set(urls):
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            res = urllib.request.urlopen(req, timeout=5)
            # print('OK', res.status, u[:60])
        except Exception as e:
            print(f'FAILED in {fpath}: {e} -> {u}')
