package com.eventi.eventi.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="prenotazioni")
public class Prenotazioni {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @ManyToOne
    @JoinColumn(name="evento_id", nullable=false)
    private Evento evento;

    @Column(nullable = false)
    private boolean pagato;

    @Column(name="numero_persone",  nullable = false)
    private int numeroPersone;

    
    @Column(name="createdAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;

   
    
}
