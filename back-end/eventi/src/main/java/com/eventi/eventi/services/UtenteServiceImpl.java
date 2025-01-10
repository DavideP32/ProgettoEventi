
package com.eventi.eventi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventi.eventi.Entity.Utente;
import com.eventi.eventi.dtos.UtenteDto;
import com.eventi.eventi.repositories.UtenteRepository;

@Service
public class UtenteServiceImpl implements UtenteService{


    @Autowired
    private UtenteRepository utenteRepository;


    @Override
    public List<UtenteDto> getAllDto(){
        List<Utente> utenti = utenteRepository.findAll();

        return toUtenteDto(utenti);
    }



    


























    //-----------------------------------DTO--------------------
    private UtenteDto toUtenteDto(Utente utente){
        UtenteDto utenteDto = new UtenteDto(
            utente.getUtente_id(),
            utente.getNome(),
            utente.getCognome(),
            utente.getDataNascita(),
            utente.getEmail(),
            utente.getRuolo()
        );

        return utenteDto;
    }


    private List<UtenteDto> toUtenteDto(List<Utente> utenti){
        List<UtenteDto> utentiDto = new ArrayList<>();
        for (Utente utente : utenti) {
            utentiDto.add(toUtenteDto(utente));
        }
        return utentiDto;
    }


    

}
