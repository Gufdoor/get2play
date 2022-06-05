package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class GamesHistoryDAO extends DAO {
	public GamesHistoryDAO() {
		if (conexao == null)
			conectar();
	}
	
	public void finalize() {
		close();
	}
	
	public String get(String id) {
	String result = null;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM \"games_history\" WHERE user_id = '" + id + "';");
			ArrayList<String> aux = new ArrayList<String>();
			while (rs.next()) {
		    	aux.add("\"" + rs.getString("name") +  "\"");
		    }
			result = "[" + String.join(",", aux) + "]";
			st.close();
			} catch (Exception e) {
					System.err.println(e.getMessage());
			}
		return result;
	}
	
	public boolean insert(String name, String user_id) {
		boolean status = false;
		try {
			if(countRecords(user_id) == 8) deleteOldestRecord(user_id);
			String sql = "INSERT INTO \"games_history\" (name, user_id)"
		               + "VALUES ('" + name + "', '"
		               + user_id + "');";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException e) {  
			throw new RuntimeException(e);
		}
		return status;
	}
	
	private boolean deleteOldestRecord(String user_id) {
		boolean status = false;
		try {
			Statement aux = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet aux2 = aux.executeQuery("SELECT MIN(id) as min_id FROM \"games_history\" WHERE user_id = '" + user_id + "';");
			if (aux2.next()) {
				Statement st = conexao.createStatement();
				st.executeUpdate("DELETE FROM \"games_history\" WHERE id = '" + aux2.getString("min_id") + "';");
				st.close();
			}
	        status = true;
	        aux.close();
		} catch (SQLException e) {  
			throw new RuntimeException(e);
		}
		return status;
	}

	private int countRecords(String id) {
		int result = 0;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT COUNT(*) as numOfRecords FROM \"games_history\" WHERE user_id = '" + id + "';");
		    if (rs.next()) {
		    	result = rs.getInt("numOfRecords");
		    }
			st.close();
			} catch (Exception e) {
					System.err.println(e.getMessage());
			}
		return result;
	}
}
