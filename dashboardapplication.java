package com.prolifics.DashboardMS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;



@SpringBootApplication
@EnableDiscoveryClient
@EnableEurekaClient
public class DashboardMsApplication extends  SpringBootServletInitializer{

	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(DashboardMsApplication.class);
    }

	public static void main(String[] args) {
		SpringApplication.run(DashboardMsApplication.class, args);
	}
	@Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
