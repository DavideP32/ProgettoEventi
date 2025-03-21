/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.eventi.eventi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventi.eventi.entities.Prenotazione;

@Repository
public interface PrenotazioniRepository extends JpaRepository<Prenotazione, Long> {

    List<Prenotazione> findByUtenteId(Long utenteId);
}
