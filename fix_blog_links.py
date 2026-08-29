import re

with open('data/blog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix general-pest-control -> No service exactly named this, but we can point it to the main services list by linking to /#services
text = text.replace("'/services/general-pest-control'", "'/#services'")
# Wait, let me check the generated markdown in the posts
text = text.replace("](/services/general-pest-control)", "](/#services)")

text = text.replace("'/services/cockroach-control'", "'/services/cockroaches'")
text = text.replace("](/services/cockroach-control)", "](/services/cockroaches)")

text = text.replace("'/services/termite-control'", "'/services/termites'")
text = text.replace("](/services/termite-control)", "](/services/termites)")

text = text.replace("'/services/bedbugs-treatment'", "'/services/bedbugs'")
text = text.replace("](/services/bedbugs-treatment)", "](/services/bedbugs)")

text = text.replace("'/services/pigeon-control'", "'/services/birds'")
text = text.replace("](/services/pigeon-control)", "](/services/birds)")

text = text.replace("'/services/commercial-pest-control'", "'/services/commercial'")
text = text.replace("](/services/commercial-pest-control)", "](/services/commercial)")

# Pests
text = text.replace("'/pests/german-cockroach'", "'/pests/cockroach-german'")
text = text.replace("](/pests/german-cockroach)", "](/pests/cockroach-german)")

text = text.replace("'/pests/termites'", "'/pests/termite'")
text = text.replace("](/pests/termites)", "](/pests/termite)")

text = text.replace("'/pests/bedbugs'", "'/pests/bedbug'")
text = text.replace("](/pests/bedbugs)", "](/pests/bedbug)")

text = text.replace("'/pests/rats'", "'/pests/rodents-rats'")
text = text.replace("](/pests/rats)", "](/pests/rodents-rats)")

text = text.replace("'/pests/wood-borer'", "'/pests/termite'")
text = text.replace("](/pests/wood-borer)", "](/pests/termite)")

text = text.replace("'/pests/black-ants'", "'/pests/termite'")
text = text.replace("](/pests/black-ants)", "](/pests/termite)")

text = text.replace("'/pests/dust-mites'", "'/pests/bedbug'")
text = text.replace("](/pests/dust-mites)", "](/pests/bedbug)")

text = text.replace("'/pests/fleas'", "'/pests/bedbug'")
text = text.replace("](/pests/fleas)", "](/pests/bedbug)")

text = text.replace("'/pests/american-cockroach'", "'/pests/cockroach-german'")
text = text.replace("](/pests/american-cockroach)", "](/pests/cockroach-german)")

text = text.replace("'/pests/oriental-cockroach'", "'/pests/cockroach-german'")
text = text.replace("](/pests/oriental-cockroach)", "](/pests/cockroach-german)")

text = text.replace("'/pests/bird-mites'", "'/pests/pigeons'")
text = text.replace("](/pests/bird-mites)", "](/pests/pigeons)")

# Cities
text = text.replace("'/city/khobar'", "'/city/dammam'")

with open('data/blog.ts', 'w', encoding='utf-8') as f:
    f.write(text)

