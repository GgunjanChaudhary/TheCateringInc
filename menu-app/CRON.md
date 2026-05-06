Use this in BigRock cPanel Cron Jobs (every 5 minutes):

*/5 * * * * /usr/bin/python3 /home/USERNAME/menu-app/check_server.py >> /home/USERNAME/menu-app/check_server.log 2>&1

Replace `USERNAME` with your cPanel username. If `/usr/bin/python3` is different on your host, replace it with the path shown by `which python3`.
