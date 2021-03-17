from jinja2 import Environment, FileSystemLoader
from markdown2 import markdown
import json

template_env = Environment(loader=FileSystemLoader(searchpath='./'))
template = template_env.get_template('template.html')

f = json.load(open("config.json"))

fd  = "../../" + f["path"] + "/blog/" +f["name"] + ".md"
output = "../../" + f["path"] + "/" + f["name"] + ".html"
url = f["url"] + f["path"] + "/" + f["name"] + ".html"

with open(fd) as markdown_file:
  article = markdown(
    markdown_file.read(),
    extras=['fenced-code-blocks', 'code-friendly']
  )

with open(output, 'w') as output_file:
  output_file.write(
    template.render(
      content=article,
      url=url,
      page_identifier=f["name"]
    )
  )