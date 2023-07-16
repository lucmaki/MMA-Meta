import os

# Directory containing the HTML files
dir_path = 'D:/Users/Luc/Projects/MMA-Meta/graphs'
new_dir = 'D:/Users/Luc/Projects/MMA-Meta/graphs_mod'
# HTML template
template = """
<!DOCTYPE html>
<html>
<head>
    <!-- Include Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
{content}
</body>
</html>
"""

# For each HTML file in the directory
for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        # Read the file
        with open(os.path.join(dir_path, filename), 'r', encoding='utf-8') as file:
            content = file.read()

        # Wrap the content with the template
        new_content = template.format(content=content)

        # Save the result to a new file
        with open(os.path.join(new_dir, filename), 'w', encoding='utf-8') as file:
            file.write(new_content)
