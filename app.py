from api import app
from cve import generate
import time
from apscheduler.schedulers.background import BackgroundScheduler

from sys import executable
from subprocess import Popen

Popen([executable, "api.py"])
Popen([executable, "cve.py"])

input("Press ENTER to exit.")
