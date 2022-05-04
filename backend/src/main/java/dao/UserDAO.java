package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import model.User;

public class UserDAO extends DAO{
	
	public UserDAO() {
		super();
		conectar();
	}
	
	public void finalize() {
		close();
	}
	
	public User login(String nickname, String password) {
		User u = null;
		try {
		Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
		ResultSet rs = st.executeQuery("SELECT * FROM \"user\" WHERE nickname = '" + nickname + "' AND password = '" + password + "';");
	    if (rs.next()) {
	    	u = new User(rs.getString("nickname"), rs.getString("password"), rs.getString("steam_id"), rs.getString("auth_key"), rs.getInt("plan"));
	    }
		st.close();
		} catch (Exception e) {
				System.err.println(e.getMessage());
		}
		return u;
	}
	
	public boolean signup(User u) {
		boolean status = false;
		try {
			u.setPlan(new SubscriptionDAO().create());
			String sql = "INSERT INTO \"user\" (nickname, password, steam_id, auth_key, plan) "
		               + "VALUES ('" + u.getNickname() + "', '"
		               + u.getPassword() + "', '" + u.getSteam_id() + "', '" + u.getAuth_key() + "', " + u.getPlan() + ");";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException e) {  
			throw new RuntimeException(e);
		}
		return status;
	}
	
	public boolean checkSteam_id(String id) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM \"user\" WHERE steam_id = '" + id + "';";
			ResultSet rs = st.executeQuery(sql);	
	        if(rs.next()){    
	        	status = true;
	        }
	        st.close();
		} catch (SQLException e) {  
			throw new RuntimeException(e);
		}
		return status;
	}
	
	public boolean checkAuth_key(String key) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM \"user\" WHERE auth_key = '" + key + "';";
			ResultSet rs = st.executeQuery(sql);	
	        if(rs.next()){    
	        	status = true;
	        }
	        st.close();
		} catch (SQLException e) {  
			throw new RuntimeException(e);
		}
		return status;
	}
	
	public boolean update(User u) {
		boolean status = false;
		try {
			String sql = "UPDATE \"user\" SET nickname = '" + u.getNickname() + "', "
					   + "password = '" + u.getPassword() + "' WHERE steam_id = '" + u.getSteam_id() + "';";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();	
			st.close();    
			status = true;
		} catch (SQLException e) {  
			throw new RuntimeException(e);
		}
		return status;
	}
	
	public boolean delete(String id) {
		boolean status = false;
		try {
			Statement aux = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet aux2 = aux.executeQuery("SELECT plan FROM \"user\" WHERE steam_id = '" + id + "';");
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM \"user\" WHERE steam_id = '" + id + "';");
			st.close();
			if (aux2.next())
				new SubscriptionDAO().delete(aux2.getInt("plan"));
	        status = true;
		} catch (SQLException e) {  
			throw new RuntimeException(e);
		}
		return status;
	}

}
