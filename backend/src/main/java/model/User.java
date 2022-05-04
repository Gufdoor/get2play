package model;

public class User {
	private String nickname;
	private String password;
	private String steam_id;
	private String auth_key;

	private int plan;
	
	public User(String nickname, String password, String steam_id, String auth_key, int plan) {
		super();
		this.nickname = nickname;
		this.password = password;
		this.steam_id = steam_id;
		this.auth_key = auth_key;
		this.plan = plan;
	}
	
	public String getNickname() {
		return nickname;
	}
	
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getSteam_id() {
		return steam_id;
	}
	
	public void setSteam_id(String steam_id) {
		this.steam_id = steam_id;
	}
	
	public String getAuth_key() {
		return auth_key;
	}

	public void setAuth_key(String auth_key) {
		this.auth_key = auth_key;
	}
	
	public int getPlan() {
		return plan;
	}
	
	public void setPlan(int plan) {
		this.plan = plan;
	}
	
}
