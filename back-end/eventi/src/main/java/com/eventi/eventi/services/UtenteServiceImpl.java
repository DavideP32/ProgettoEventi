package com.eventi.eventi.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventi.eventi.dtos.UtenteDto;
import com.eventi.eventi.entities.Utente;
import com.eventi.eventi.enums.Ruolo;
import com.eventi.eventi.repositories.UtenteRepository;

@Service
public class UtenteServiceImpl implements UtenteService {

    @Autowired
    private UtenteRepository utenteRepository;

    /* -------------------------------------------------------------------------- */
    /*                                   GET ALL                                  */
    /* -------------------------------------------------------------------------- */
    @Override
    public List<UtenteDto> getAllDto() {
        List<Utente> utenti = utenteRepository.findAll();

        return toUtenteDto(utenti);
    }

    /* -------------------------------------------------------------------------- */
    /*                                GET DTO BY ID                               */
    /* -------------------------------------------------------------------------- */
    @Override
    public UtenteDto getUtenteDtoById(long id) {
        Optional<Utente> u = utenteRepository.findById(id);

        if(u.isPresent()){
            UtenteDto utente = toUtenteDto(u.get());
            return utente;
        }else{
            return null;
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                          GET NORMALE BY ID                                 */
    /* -------------------------------------------------------------------------- */
    @Override
    public Utente prendiPerId(long id){
        Optional<Utente> u = utenteRepository.findById(id);
        if(u.isPresent()){
            Utente utente = u.get();
            return utente;
        }else{
            return null;
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                GET BY EMAIL                                */
    /* -------------------------------------------------------------------------- */
    @Override
    public UtenteDto prendiUtenteDtoByEmail(String email){
        return this.toUtenteDto(utenteRepository.findByEmail(email));
    }

    @Override
    public Utente prendiUtenteByEmail(String email){
        return utenteRepository.findByEmail(email);
    }

    /* -------------------------------------------------------------------------- */
    /*                               AGGIUNGI UTENTE                              */
    /* -------------------------------------------------------------------------- */
    @Override
    public UtenteDto aggiungiUtente(Utente utente){
        utente.setId(0L);
        utenteRepository.save(utente);
        return toUtenteDto(utente);
    }

    /* -------------------------------------------------------------------------- */
    /*                               AGGIORNA UTENTE                              */
    /* -------------------------------------------------------------------------- */
    @Override
    public UtenteDto aggiornaUtente(Utente utente, Utente trovato){
        trovato.setNome(utente.getNome());
		trovato.setCognome(utente.getCognome());
		trovato.setDataNascita(utente.getDataNascita());
		trovato.setEmail(utente.getEmail());
		trovato.setRuolo(utente.getRuolo());
        if(trovato.getPassword() == null){
            trovato.setPassword(utente.getPassword());
        }
		
		utenteRepository.save(trovato);
		return this.toUtenteDto(utente);
    }

    @Override
    public UtenteDto aggiornaRuoloUtente(long id){
        Utente u = prendiPerId(id);

        if(u.getRuolo() == Ruolo.RUOLO_UTENTE){
            u.setRuolo(Ruolo.RUOLO_ADMIN);
        } else if (u.getRuolo() == Ruolo.RUOLO_ADMIN){
            u.setRuolo(Ruolo.RUOLO_UTENTE);
        }

        utenteRepository.save(u);
        return toUtenteDto(u);
    }


    /* -------------------------------------------------------------------------- */
    /*                               CANCELLA UTENTE                              */
    /* -------------------------------------------------------------------------- */
    @Override
    public void cancellaUtenteById(long id){
        utenteRepository.deleteById(id);
    }



    /* -------------------------------------------------------------------------- */
    /*                            VERIFICA CREDENZIALI                            */
    /* -------------------------------------------------------------------------- */
    public boolean verificaPassword(String passwordInserita, String passwordSalvata){
        return passwordInserita.equals(passwordSalvata);
    }


    @Override
    public Utente verificaCredenziali(String email, String password){
        Utente u = utenteRepository.findByEmail(email);

        if(u != null && verificaPassword(password, u.getPassword())){
            return u;
        }
        return null;
    }





    /* -------------------------------------------------------------------------- */
    /*                               CONVERSIONE DTO                              */
    /* -------------------------------------------------------------------------- */
    private UtenteDto toUtenteDto(Utente utente) {
        UtenteDto utenteDto = new UtenteDto(
                utente.getId(),
                utente.getNome(),
                utente.getCognome(),
                utente.getDataNascita(),
                utente.getEmail(),
                utente.getRuolo(),
                utente.getPrenotazioni()
        );

        return utenteDto;
    }

    private List<UtenteDto> toUtenteDto(List<Utente> utenti) {
        List<UtenteDto> utentiDto = new ArrayList<>();
        for (Utente utente : utenti) {
            utentiDto.add(toUtenteDto(utente));
        }
        return utentiDto;
    }

}
