from jinja2 import Environment, FileSystemLoader
import json

template_env = Environment(loader=FileSystemLoader(searchpath='./'))
template = template_env.get_template('indextemplate.html')

f = json.load(open("indexpage.json"))

with open('../index.html', 'w') as output_file:
  output_file.write(
    template.render(
      recent_blogs=f["recent_blog"]
    )
  )