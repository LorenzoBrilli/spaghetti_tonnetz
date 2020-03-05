# Python 3 builder: just put everything inside a single html file

import re

print("opening index.html")

htmlFile = open("../src/index.html",'r')
htmlLines = htmlFile.readlines()
htmlFile.close()

buildFile = open("build.html",'w')

for line in htmlLines:
    res = re.findall(r"(<script[^<>]*src=\"([^\"<>]*)\"[^<>]*></script>)",line)
    if len(res) > 0:
        newLine = line
        for match in res:
            print("opening "+match[1]+"...")
            rf = open("../src/"+match[1])
            r = rf.read()
            rf.close()
            print("replacing "+match[1]+"...")
            newLine = newLine.replace(match[0],"<script>\n"+r+"\n</script>")
        line = newLine
    res = re.findall(r"(<link[^<>]*rel=\"stylesheet\"[^<>]*href=\"([^\"<>]*)\"[^<>]*>)",line)
    if len(res) > 0:
        newLine = line
        for match in res:
            print("opening "+match[1]+"...")
            rf = open("../src/"+match[1])
            r = rf.read()
            rf.close()
            print("replacing "+match[1]+"...")
            newLine = newLine.replace(match[0],"<style>\n"+r+"\n</style>")
        line = newLine
    buildFile.write(line)

buildFile.close()

print("DONE")