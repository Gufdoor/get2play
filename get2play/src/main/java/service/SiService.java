package service;

//import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Random;


import com.google.gson.Gson;

import dao.GamesHistoryDAO;
import model.Game;
import spark.Request;
import spark.Response;

public class SiService {
	
	private static final String MODEL_URL = "http://7d5b74f7-b5df-4ac3-9ecf-f29f146b4bfb.southcentralus.azurecontainer.io/score";
    private static final String API_KEY = "nMXi2y3DLTV1oPbn2uAYjNKu0isxzSpR";
    private static GamesHistoryDAO gamesHistoryDAO = new GamesHistoryDAO();
	
	public static String get(Request req, Response res) throws Exception {
		String gameName = getRecommendation(req.queryParams("genre"), Integer.parseInt(req.queryParams("type")));
		if (gameName != "") {
			gamesHistoryDAO.insert(gameName, req.params("steam_id"));
			res.status(200);
			res.body("{\"status\":\"SUCCESS\", \"data\":\"" + gameName + "\"}");
		} else {
			res.status(404);
			res.body("{\"status\":\"ERROR\"}");
		}
		return res.body();
	}
	
	public static String getRecommendationHistory(Request req, Response res) {
		String json = gamesHistoryDAO.get(req.params(":steam_id"));
		if (json != null) {
			res.status(200);
			res.body("{\"status\":\"SUCCESS\", \"data\":" + json + "}");
		} else {
			res.status(404);
			res.body("{\"status\":\"ERROR\"}");
		}
		return res.body();
	}

	private static String getRecommendation(String genre, int isMP) throws Exception {
		String gameName = null, gameGenre = "";
		while (genre.compareTo(gameGenre) != 0) {
			HttpClient client = HttpClient.newHttpClient();
	        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(MODEL_URL))
	                .headers("Content-Type", "application/json", "Authorization", "Bearer " + API_KEY)
	                .POST(HttpRequest.BodyPublishers.ofString(getRandomGame(isMP)))
	                .build();
	
	        try {
	            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
	            Gson gson = new Gson(); 
	            String aux = response.body().replaceAll("\\\\", "");
	            Object[][] arr = gson.fromJson(aux, Object[][].class);
	            for (Object[] o : arr) {
	            	gameGenre = o[o.length - 1].toString();
	            	if (genre.compareTo(gameGenre) == 0) {
	            		gameName = o[0].toString();
	            		break;
	            	}
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
		}
		return gameName;
	}

	private static String getRandomGame(int isMP) throws Exception {
		//System.out.println(Paths.get(".").toAbsolutePath());
		String gameJson = new String(Files.readAllBytes(Paths.get("src/main/resources/public/assets/json/games.json")));
		Gson gson = new Gson();
		Game[] games = gson.fromJson(gameJson, Game[].class);
		Random r = new Random();
		Game[] g = new Game[10];
		for (int i = 0; i < 10; i++) {
			g[i] = games[Math.abs(r.nextInt() % games.length)];
			if (isMP == 1)
				while(g[i].Is_Multiplayer != isMP) g[i] = games[Math.abs(r.nextInt() % games.length)];
			else if (isMP == 0)
				while(g[i].Is_Multiplayer != isMP) g[i] = games[Math.abs(r.nextInt() % games.length)];
		}
		return gson.toJson(g).toString();
	}
}
