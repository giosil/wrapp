package org.dew.dossier.util;

import org.dew.nosql.*;

public 
class ConnectionManager 
{
	protected static INoSQLDB noSQLDB;
	
	public static 
	INoSQLDB getDefaultNoSQLDB() 
		throws Exception 
	{
		if(noSQLDB != null) return noSQLDB;
		
		String sNoSQL = System.getProperty("nosql", "");
		sNoSQL = sNoSQL != null ? sNoSQL.trim().toLowerCase() : "";
		
		if(sNoSQL.startsWith("m")) {
			noSQLDB = new NoSQLMongoDB3("dossier");
		}
		else if(sNoSQL.startsWith("e")) {
			noSQLDB = new NoSQLElasticsearch("dossier");
		}
		else {
			noSQLDB = new NoSQLMock("dossier");
		}
		
		return noSQLDB;
	}
}
