package app;

import static spark.Spark.*;
import service.UserService;
import service.SiService;
import service.SubscriptionService;

public class App {

	public static void main(String[] args) {
		port(4567);

		
		staticFiles.location("/public");

		post("user/signup", (req, res) -> UserService.signup(req, res));

		get("user/check_id/:steam_id", (req, res) -> UserService.checkSteam_id(req, res));

		get("user/check_name/:nickname", (req, res) -> UserService.checkNickname(req, res));

		post("user/login", (req, res) -> UserService.login(req, res));

		put("user/update", (req, res) -> UserService.update(req, res));

		delete("user/delete/:steam_id", (req, res) -> UserService.delete(req, res));

		put("subscription/update", (req, res) -> SubscriptionService.update(req, res));

		get("subscription/:id", (req, res) -> SubscriptionService.get(req, res));

		get("recommendation/:steam_id", (req, res) -> SiService.get(req, res));
		
		get("recommendation/history/:steam_id", (req, res) -> SiService.getRecommendationHistory(req, res));

	}
}
