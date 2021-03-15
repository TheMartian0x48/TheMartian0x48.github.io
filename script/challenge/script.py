from jinja2 import Environment, FileSystemLoader
import json

template_env = Environment(loader=FileSystemLoader(searchpath='./'))
template = template_env.get_template('template.html')

f = json.load(open("config.json"))

with open('../../page/challenge.html', 'w') as output_file:
  output_file.write(
    template.render(
      recent_blogs=f["challenge"]
    )
  )