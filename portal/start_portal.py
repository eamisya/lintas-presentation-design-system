import os
import sys
import webbrowser
import http.server
import socketserver

PORT = 8080
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

def run():
    os.chdir(DIST_DIR)
    url = f"http://localhost:{PORT}"
    print("=" * 60)
    print(" Lintas Presentation Design System — Skill Portal")
    print("=" * 60)
    print(f" Serving portal from: {DIST_DIR}")
    print(f" Opening browser at: {url}")
    print(" Press Ctrl+C to stop the server.")
    print("=" * 60)

    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Could not open browser automatically: {e}")

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except Exception as e:
        print(f"Server error: {e}")

if __name__ == "__main__":
    run()
