package org.dew.dossier.web;

import java.io.IOException;

import java.security.Principal;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dew.dossier.ws.*;

import org.rpc.util.SimplePrincipal;

@WebServlet(name = "WebRPC", loadOnStartup = 1, urlPatterns = { "/rpc/*" })
public 
class WebRPC extends org.rpc.server.RpcServlet 
{
	private static final long serialVersionUID = 856223622448985842L;
	
	public 
	void init() 
		throws ServletException 
	{
		System.out.println("WebRPC.init()...");
		
		rpcExecutor = new org.rpc.server.MultiRpcExecutor();
		
		restAudit  = null;
		restTracer = null;
		
		legacy           = false;
		createRpcContex  = true;
		checkSession     = false;
		checkSessionREST = false;
		restful          = true;
		about            = true;
		
		basicAuth        = true;
		encoding         = "UTF-8";
		
		addWebService(new WSPatients(),    "PATIENTS",    "Patients manager");
		addWebService(new WSServices(),    "SERVICES",    "Services manager");
		addWebService(new WSStructures(),  "STRUCTURES",  "Structures manager");
		addWebService(new WSPathologies(), "PATHOLOGIES", "Pathologies manager");
		addWebService(new WSEvents(),      "EVENTS",      "Events manager");
		addWebService(new WSStatistics(),  "STATISTICS",  "Statistics manager");
	}
	
	protected
	void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException
	{
		super.doPost(request, response);
	}
	
	@Override
	protected
	Principal authenticate(String username, String password)
	{
		System.out.println("WebRPC.authenticate(" + username + ",*)...");
		
		return new SimplePrincipal(username);
	}
	
	@Override
	protected
	Principal checkToken(String token)
	{
		System.out.println("WebRPC.checkToken(" + token + ")...");
		
		return new SimplePrincipal(token);
	}
}
