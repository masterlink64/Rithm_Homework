@app.route('/games')
def index():
    # making a connection to your database
    with psycopg2.connect("postgresql://localhost/video_games") as conn:
        c = conn.cursor()
        c.execute('SELECT name, id, rating, system FROM games')
        games = c.fetchall()
        games = [{
            "name": g[0],
            "id": g[1],
            "rating": g[2],
            "system": g[3]
        } for g in games]
    return render_template('index.html', games=games)