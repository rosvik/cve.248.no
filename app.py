from api import app
from cve import generate
import time
from apscheduler.schedulers.background import BackgroundScheduler


generate()

scheduler = BackgroundScheduler()
scheduler.add_job(func=generate, trigger="interval", seconds=3600)
scheduler.start()

app.run()
