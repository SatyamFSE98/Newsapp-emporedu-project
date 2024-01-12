package com.news.wishlist.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {

	@Bean
	OpenAPI customOpenAPI() {
		return new OpenAPI()
				.components(new Components().addSecuritySchemes("bearer-token",
						new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")
								.name("wishlist")))
				.info(new Info().title("WISHLIST-MICROSERVICE")
						.description("@author:https://github.com/SatyamFSE98 auth for news app").version("1.0.0"))
				.addSecurityItem(new SecurityRequirement().addList("bearer-token"));
	}

}
