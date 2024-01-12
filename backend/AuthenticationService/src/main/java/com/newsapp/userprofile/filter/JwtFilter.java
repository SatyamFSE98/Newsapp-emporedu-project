package com.newsapp.userprofile.filter;

import java.io.IOException;

import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter extends GenericFilterBean {

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		final HttpServletRequest request = (HttpServletRequest) servletRequest;
		final HttpServletResponse response = (HttpServletResponse) servletResponse;
		final String authHeader = request.getHeader("authorization");
		if ("OPTIONS".equals(request.getMethod())) {

			response.setStatus(HttpServletResponse.SC_OK);
			filterChain.doFilter(request, response); // gate keeper opens here for further flow
		} else {
			if (authHeader == null || !authHeader.startsWith("Bearer ")) {
				throw new ServletException("Missing or invalid Authorization header");
			}
//request has header with bearer and token
			final String token = authHeader.substring(7);
			final Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
//validation happens in above line
			request.setAttribute("claims", claims);
			filterChain.doFilter(request, response);// gate keeper opens here for further flow
		}

	}

}
