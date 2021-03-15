from jinja2 import Environment, FileSystemLoader
import json

template_env = Environment(loader=FileSystemLoader(searchpath='./'))
template = template_env.get_template('blogtemplate.html')

f = json.load(open("bloglist.json"))

with open(f["location"], 'w') as output_file:
  output_file.write(
    template.render(
      blogs=f["blog"]
    )
  )