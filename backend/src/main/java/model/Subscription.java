package model;

public class Subscription {
	private int id;
	private int type;
	private int cupons;
	private static int nextId = 1;
	
	public Subscription(int id, int type, int cupons) {
		this.id = id;
		this.type = type;
		this.cupons = cupons;
	}
	
	public Subscription(int type, int cupons) {
		this.id = nextId++;
		this.type = type;
		this.cupons = cupons;
	}

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public void setId() {
		this.id = nextId++;
	}
	
	public int getType() {
		return type;
	}
	
	public void setType(int type) {
		this.type = type;
	}
	
	public int getCupons() {
		return cupons;
	}
	
	public void setCupons(int cupons) {
		this.cupons = cupons;
	}
}
