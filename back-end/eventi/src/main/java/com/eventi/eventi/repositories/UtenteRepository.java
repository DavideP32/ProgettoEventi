package com.eventi.eventi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventi.eventi.entities.Utente;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, Long> {

    Utente findByEmail(String email);
    
} 
