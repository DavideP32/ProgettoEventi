package com.eventi.eventi.entities;

import java.time.LocalDate;

import com.eventi.eventi.enums.Ruolo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "utenti")
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length=75, nullable=true)
    private String nome;

    @Column(length=75, nullable=true)
    private String cognome;

    @Column(name = "data_nascita")
    @Temporal(TemporalType.DATE)
    private LocalDate dataNascita;

    @Column(length=50, nullable = false, unique = true)
    private String email;

    @Column(length = 20, nullable = false)
    private String password;

    @Column(columnDefinition = "ENUM('RUOLO_ADMIN', 'RUOLO_UTENTE')")
	@Enumerated(EnumType.STRING)
    private Ruolo ruolo;

    // @JsonIgnore
    // @OneToMany(mappedBy="utenteId")
    // private List<Prenotazioni> prenotazioni;

    // public List<Prenotazioni> getPrenotazioni() {
    //     return prenotazioni;
    // }

    // public void setPrenotazioni(List<Prenotazioni> prenotazioni) {
    //     this.prenotazioni = prenotazioni;
    // }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public LocalDate getDataNascita() {
        return dataNascita;
    }

    public void setDataNascita(LocalDate dataNascita) {
        this.dataNascita = dataNascita;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Ruolo getRuolo() {
        return ruolo;
    }

    public void setRuolo(Ruolo ruolo) {
        this.ruolo = ruolo;
    }

    


}
