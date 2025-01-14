/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.eventi.eventi.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventi.eventi.entities.Prenotazioni;
import com.eventi.eventi.repositories.PrenotazioniRepository;

@Service
public class PrenotazioniServiceImpl implements PrenotazioniService{

    @Autowired
    PrenotazioniRepository prenotazioniRepository;

    public List<Prenotazioni> getAllPreno(){
        List<Prenotazioni> prenotazioni = prenotazioniRepository.findAll();
        return prenotazioni;
    }
}
