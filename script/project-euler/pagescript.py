from jinja2 import Environment, FileSystemLoader
from markdown2 import markdown
import json

template_env = Environment(loader=FileSystemLoader(searchpath='./'))
template = template_env.get_template('pagetemplate.html')

f = json.load(open("list-config.json"))

output = "../../page/project-euler.html"


with open(output, 'w') as output_file:
  output_file.write(
    template.render(
      solved=f["problem-list"]
    )
  )