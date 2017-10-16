package org.dccarlos.sample.chat.controllers;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import org.springframework.stereotype.Controller;

@Controller
public class SampleChatController {

	@MessageMapping("/chat")
	@SendTo("/topic/chat")
	public ChatMessage greeting(ChatMessage message, Principal principal) throws Exception {
		return new ChatMessage(principal.getName() + ": " + message.getContent());
	}
}