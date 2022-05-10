package service;

import model.Subscription;
import dao.SubscriptionDAO;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;

public class SubscriptionService {
	
	private static SubscriptionDAO subDao = new SubscriptionDAO();
	
	public static String get(Request req, Response res) {
		UserService.checkAuth(req.headers("Authorization"), SubscriptionDAO.getUserIdBySubId(req.params(":id")));
		 Subscription sub = subDao.get(req.params(":id"));
		if (sub != null) {
			res.status(200);
			res.body("{\"status\":\"SUCCESS\", \"data\":" + new Gson().toJson(sub) + "}");
		} else {
			res.status(404);
			res.body("{\"status\":\"ERROR\"}");
		}
		return res.body();
	}
	
	public static String update(Request req, Response res) {
		UserService.checkAuth(req.headers("Authorization"), SubscriptionDAO.getUserIdBySubId(new Gson().fromJson(req.body(), Subscription.class).getId() + ""));
		if (subDao.update(new Gson().fromJson(req.body(), Subscription.class))) {
			res.status(200);
			res.body("{\"status\":\"UPDATED\"}");
		} else {
			res.status(404);
			res.body("{\"status\":\"ERROR\"}");
		}
		return res.body();
	}
	
	public static void delete(int id) {
		subDao.delete(id);
	}
}
