package org.dccarlos.sample.chat.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SampleChatSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private SampleChatUserDetailsService sampleUserDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.sampleUserDetailsService).passwordEncoder(SampleChatUserDetailsService.PASSWORD_ENCODER);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
      //@formatter:off
        http.headers()
            .frameOptions()
            .sameOrigin()
            .and()
            .authorizeRequests().antMatchers("/js/**", "/login").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin().loginPage("/login").defaultSuccessUrl("/", true)
            .and()
            .csrf().disable();
      //@formatter:on
    }
}