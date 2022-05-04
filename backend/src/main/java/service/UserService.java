package service;

import dao.UserDAO;
import model.User;
import spark.Request;
import spark.Response;
import com.google.gson.*;

import static spark.Spark.halt;

import java.util.UUID;

public class UserService {
	private static UserDAO userDao = new UserDAO();
	
	public static String login(Request req, Response res) {
		User u = new Gson().fromJson(req.body(), User.class);
		u = userDao.login(u.getNickname(), u.getPassword());
		if (u != null) {
			res.status(200);
			res.body("{\"status\":\"SUCCESS\", \"data\":" + new Gson().toJson(u) + "}");
		} else {
			res.status(404);
			res.body("{\"status\":\"ERROR\"}");
		}
		return res.body();
	}
	
	public static String signup(Request req, Response res) {
		User u = new Gson().fromJson(req.body(), User.class);
		u.setAuth_key(UUID.randomUUID().toString());
		if (userDao.signup(u)) {
			res.status(201);
			res.body("{\"status\":\"CREATED\"}");
		} else {
			res.status(201);
			res.body("{\"status\":\"ERROR\"}");
		}
		return res.body();
	}
	
	public static String checkSteam_id(Request req, Response res) {
		if (userDao.checkSteam_id(req.params(":steam_id"))) {
			res.status(404);
			res.body("{\"status\":true}");
		} else {
			res.status(200);
			res.body("{\"status\":false}");
		}
		return res.body();
	}
	
	public static void checkAuth(String auth) {
		if (!new UserDAO().checkAuth_key(auth))
			halt(401);
	}
	
	public static String update(Request req, Response res) {
		checkAuth(req.headers("Authorization"));
		if (userDao.update(new Gson().fromJson(req.body(), User.class))) {
			res.status(200);
			res.body("{\"status\":\"UPDATED\"}");
		} else {
			res.status(404);
			res.body("{\"status\":\"ERROR\"}");
		}
		return res.body();
	}
	
	public static String delete(Request req, Response res) {
		checkAuth(req.headers("Authorization"));
		if (userDao.delete(req.params(":steam_id"))) {
			res.status(200);
			res.body("{\"status\":\"DELETED\"}");
		} else {
			res.status(404);
			res.body("{\"status\":\"ERROR\"}");
		}
		return res.body();
	}
}
