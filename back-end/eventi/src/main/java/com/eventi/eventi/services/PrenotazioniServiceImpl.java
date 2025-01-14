package com.eventi.eventi.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventi.eventi.entities.Prenotazione;
import com.eventi.eventi.repositories.PrenotazioniRepository;

@Service
public class PrenotazioniServiceImpl implements PrenotazioniService{

    @Autowired
    PrenotazioniRepository prenotazioniRepository;

    @Override
    public List<Prenotazione> getAllPreno(){
        List<Prenotazione> prenotazioni = prenotazioniRepository.findAll();
        return prenotazioni;
    }

    @Override
    public Prenotazione aggiungiPrenotazioni(Prenotazione prenotazione){

    }
}
