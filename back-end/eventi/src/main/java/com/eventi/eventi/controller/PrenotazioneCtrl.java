package com.eventi.eventi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.eventi.eventi.services.PrenotazioniService;


@Controller
@RequestMapping("/api/prenotazioni")
public class PrenotazioneCtrl {
   
    @Autowired
    PrenotazioniService prenotazioneService;


    
}
