package app;

import static spark.Spark.*;
import service.UserService;
import service.SubscriptionService;

public class App {
	
	private static void enableCORS(final String origin, final String methods, final String headers) {

	    options("/*", (request, response) -> {

	        String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
	        if (accessControlRequestHeaders != null) {
	            response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
	        }

	        String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
	        if (accessControlRequestMethod != null) {
	            response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
	        }

	        return "OK";
	    });

	    before((request, response) -> {
	        response.header("Access-Control-Allow-Origin", origin);
	        response.header("Access-Control-Request-Method", methods);
	        response.header("Access-Control-Allow-Headers", headers);
	        // Note: this may or may not be necessary in your particular application
	        response.type("application/json");
	    });
	}
	
	public static void main(String[] args) {
		port(4567);
		
		enableCORS("*", "*", "*");
		
		post("user/signup", (req, res) -> UserService.signup(req, res));
		
		get("user/check_id/:steam_id", (req, res) -> UserService.checkSteam_id(req, res));
		
		get("user/check_name/:nickname", (req, res) -> UserService.checkNickname(req, res));
		
		post("user/login", (req, res) -> UserService.login(req, res));
		
		put("user/update", (req, res) -> UserService.update(req, res));
		
		delete("user/delete/:steam_id", (req, res) -> UserService.delete(req, res));
		
		put("subscription/update", (req, res) -> SubscriptionService.update(req, res));
		
		get("subscription/:id", (req, res) -> SubscriptionService.get(req, res));
		
	}
}
