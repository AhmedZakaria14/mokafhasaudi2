import re

with open('data/blog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("'/services/general-pest-control'", "'/#services'")
text = text.replace('"/services/general-pest-control"', '"/#services"')

text = text.replace("'/services/cockroach-control'", "'/services/cockroaches'")
text = text.replace('"/services/cockroach-control"', '"/services/cockroaches"')

with open('data/blog.ts', 'w', encoding='utf-8') as f:
    f.write(text)
