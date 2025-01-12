
package com.eventi.eventi.services;

import java.util.List;

import com.eventi.eventi.dtos.UtenteDto;
import com.eventi.eventi.entities.Utente;


public interface UtenteService {

    public List<UtenteDto> getAllDto();
    	
	UtenteDto getUtenteDtoById(long id);
	Utente prendiPerId(long id);
	UtenteDto prendiUtenteByEmail(String email);
	
	UtenteDto aggiungiUtente(Utente utente);
	UtenteDto aggiornaUtente(Utente utente, Utente trovato);
	// void cancellaUtenteById(long id);
	
	
	// public Utente verificaCredenziali(String email, String password);
}
