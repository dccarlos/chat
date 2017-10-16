package org.dccarlos.sample.chat.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = {"/", "/login"})
    public String index() {
        return "index";
    }
}