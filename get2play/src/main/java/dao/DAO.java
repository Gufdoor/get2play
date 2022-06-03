package dao;

import java.sql.*;

public class DAO {
	protected static Connection conexao;
	private static int count = 0;

	public DAO() {
		conexao = null;
	}

	public boolean conectar() {
		String driverName = "org.postgresql.Driver";
		String serverName = "ec2-34-227-120-79.compute-1.amazonaws.com"; 
		String mydatabase = "d9t35h7fd9a5h2";
		int porta = 5432;
		String url = "jdbc:postgresql://" + serverName + ":" + porta + "/" + mydatabase;
		String username = "uxfsqfafuvqjih";
		String password = "02666e877d5018287d93c865b1d804bb47c9e78e45f5edb251b997cfbabf1a30";
		boolean status = false;
		try {
			Class.forName(driverName);
			conexao = DriverManager.getConnection(url, username, password);
			status = (conexao == null);
			System.out.println(count++ + ": Connected with postgres");
		} catch (ClassNotFoundException e) {
			System.err.println("Connection with postgres failed -- Driver not found -- " + e.getMessage());
		} catch (SQLException e) {
			System.err.println("Connection with postgres failed -- " + e.getMessage());
		}

		return status;
	}

	public boolean close() {
		boolean status = false;

		try {
			conexao.close();
			status = true;
		} catch (SQLException e) {
			System.err.println(e.getMessage());
		}
		return status;
	}
}