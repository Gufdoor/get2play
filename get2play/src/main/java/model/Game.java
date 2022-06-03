package model;

public class Game {
	public String Title;
	public int Rating;
	public int Required_Age;
	public int Is_Multiplayer;
	public String Genre;
	
	public Game(String title, int rating, int required_Age, int is_Multiplayer, String genre) {
		super();
		Title = title;
		Rating = rating;
		Required_Age = required_Age;
		Is_Multiplayer = is_Multiplayer;
		Genre = genre;
	}
}
