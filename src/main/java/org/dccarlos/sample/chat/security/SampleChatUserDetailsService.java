package org.dccarlos.sample.chat.security;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Component;

@Component
public class SampleChatUserDetailsService implements UserDetailsService {
    public static final Log log = LogFactory.getLog(SampleChatUserDetailsService.class);

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        if (name == null || name.isEmpty())
            throw new UsernameNotFoundException("Username is null or empty");

        log.warn("Login user: " + name);

        return new User(name, PASSWORD_ENCODER.encode(name + 'x'), AuthorityUtils.createAuthorityList(new String[]{"USER", "ADMIN"}));
    }
}