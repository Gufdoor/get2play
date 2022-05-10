package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import model.Subscription;

public class SubscriptionDAO extends DAO {
	
	public SubscriptionDAO() {
		if (conexao == null)
			conectar();
	}
	
	public void finalize() {
		close();
	}
	
	public static int create() {
		int id = 0;
		try {
			Subscription sub = new Subscription(0, 0);
			id = sub.getId();
			String sql = "INSERT INTO \"subscription\" (id, type, cupons) "
		               + "VALUES (" + sub.getId() + ", " + sub.getType() + ", " + sub.getCupons() + ");";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		return id;
	}
	
	public Subscription get(String id) {
		Subscription sub = null;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM \"subscription\" WHERE id = " + id + ";");
		    if (rs.next()) {
		    	sub = new Subscription(rs.getInt("id"), rs.getInt("type"), rs.getInt("cupons"));
		    }
			st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return sub;
	}
	
	public static String getUserIdBySubId(String subId) {
		String userId = null;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT steam_id FROM \"user\" WHERE plan = " + subId + ";");
		    if (rs.next()) {
		    	userId = rs.getString("steam_id");
		    }
			st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return userId;
	}

	public static int getNextId() {
		int nextId = 1;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT MAX(id) AS next_id FROM \"subscription\";");
		    if (rs.next()) {
		    	nextId = rs.getInt("next_id") + 1;
		    }
			st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return nextId;
	}
	
	public boolean update(Subscription sub) {
		boolean status = false;
		try {
			String sql = "UPDATE \"subscription\" SET type = " + sub.getType() + 
						 ", cupons = " + sub.getCupons() + " WHERE id = " + sub.getId() + ";";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();	
			st.close();
			status = true;
		} catch (SQLException e) {  
			throw new RuntimeException(e);
		}
		return status;
	}
	
	public boolean delete(int id) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM \"subscription\" WHERE id = " + id);
			st.close();
			status = true;
		} catch (SQLException e) {  
			throw new RuntimeException(e);
		}
		return status;
	}
}

